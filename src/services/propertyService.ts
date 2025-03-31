import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  deleteDoc,
  DocumentSnapshot 
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';

// Define Property type if not already defined elsewhere
export interface Property {
  id?: string;
  title?: string;
  description?: string;
  location?: string;
  developer?: string;
  price?: number;
  status?: 'pending' | 'approved' | 'rejected';
  images?: string[];
  submittedBy?: string;
  submittedOn?: string;
  createdAt?: string;
  updatedAt?: string;
  adminNote?: string;
  [key: string]: any; // For other property fields
}

/**
 * Get all properties with optional status filter
 */
export async function getProperties(status = 'all'): Promise<Property[]> {
  try {
    const propertiesRef = collection(db, 'properties');
    let q;
    
    if (status !== 'all') {
      q = query(propertiesRef, where('status', '==', status));
    } else {
      q = propertiesRef;
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error("Error getting properties:", error);
    throw error;
  }
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Property;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting property:", error);
    throw error;
  }
}

/**
 * Add a new property with external image URLs
 */
export interface AddPropertyResponse {
    id: string | null;
    error: string | null;
}

export interface AddPropertyInput {
    title?: string;
    description?: string;
    location?: string;
    developer?: string;
    price?: number;
    [key: string]: any; // For other possible property fields
}

export async function addProperty(
    propertyData: AddPropertyInput, 
    imageUrls: string[] = []
): Promise<AddPropertyResponse> {
    try {
        // Check if user is authenticated
        if (!auth.currentUser) {
            return { id: null, error: "User must be authenticated to add properties" };
        }
        
        // Add user ID, status and timestamps
        const property = {
            ...propertyData,
            images: imageUrls, // These should be URLs from external services like Cloudinary, ImgBB, etc.
            status: 'pending',
            submittedBy: auth.currentUser.uid,
            submittedOn: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        const docRef = await addDoc(collection(db, 'properties'), property);
        return { id: docRef.id, error: null };
    } catch (error) {
        console.error("Error adding property:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { id: null, error: errorMessage };
    }
}

/**
 * Update property status and admin notes
 */
export interface UpdatePropertyStatusResponse {
  success: boolean;
  error: string | null;
}

export async function updatePropertyStatus(
  propertyId: string,
  status: 'pending' | 'approved' | 'rejected',
  notes: string = ''
): Promise<UpdatePropertyStatusResponse> {
  try {
    // Verify property exists before updating
    const propertyDoc = await getDoc(doc(db, 'properties', propertyId));
    if (!propertyDoc.exists()) {
      return { success: false, error: "Property not found" };
    }
    
    const propertyRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyRef, {
      status,
      adminNote: notes,
      updatedAt: new Date().toISOString()
    });
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating property status:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Update property details
 */
export async function updateProperty(
  id: string,
  data: Partial<Property>
): Promise<{ success: boolean; error: string | null; }> {
  try {
    const propertyRef = doc(db, 'properties', id);
    
    // Check if property exists
    const docSnap = await getDoc(propertyRef);
    if (!docSnap.exists()) {
      return { success: false, error: "Property not found" };
    }
    
    await updateDoc(propertyRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating property:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Delete property (no longer handles image deletion from Storage)
 */
export async function deleteProperty(id: string): Promise<{ success: boolean; error: string | null; }> {
  try {
    // Check if property exists before deleting
    const propertyRef = doc(db, 'properties', id);
    const docSnap = await getDoc(propertyRef);
    
    if (!docSnap.exists()) {
      return { success: false, error: "Property not found" };
    }
    
    // Delete the Firestore document
    await deleteDoc(propertyRef);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting property:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Search for properties by query string
 */
export async function searchProperties(
  query: string,
  status = 'all'
): Promise<Property[]> {
  try {
    // Get all properties first (we need to filter in JS because Firestore doesn't support full text search)
    const properties = await getProperties(status);
    
    // If no query, return all properties
    if (!query || query.trim() === '') {
      return properties;
    }
    
    // Filter properties based on the query
    const lowercaseQuery = query.toLowerCase().trim();
    return properties.filter(property => 
      (property.title && property.title.toLowerCase().includes(lowercaseQuery)) ||
      (property.description && property.description.toLowerCase().includes(lowercaseQuery)) ||
      (property.location && property.location.toLowerCase().includes(lowercaseQuery)) ||
      (property.developer && property.developer.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error("Error searching properties:", error);
    throw error;
  }
}

/**
 * Get property statistics (counts by status)
 */
export interface PropertyStatistics {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export async function getPropertyStatistics(): Promise<PropertyStatistics> {
  try {
    const pendingQuery = query(collection(db, 'properties'), where('status', '==', 'pending'));
    const approvedQuery = query(collection(db, 'properties'), where('status', '==', 'approved'));
    const rejectedQuery = query(collection(db, 'properties'), where('status', '==', 'rejected'));
    
    const [pendingSnap, approvedSnap, rejectedSnap] = await Promise.all([
      getDocs(pendingQuery),
      getDocs(approvedQuery),
      getDocs(rejectedQuery)
    ]);
    
    return {
      pending: pendingSnap.docs.length,
      approved: approvedSnap.docs.length,
      rejected: rejectedSnap.docs.length,
      total: pendingSnap.docs.length + approvedSnap.docs.length + rejectedSnap.docs.length
    };
  } catch (error) {
    console.error("Error getting statistics:", error);
    // Return empty stats on error rather than throwing
    return { pending: 0, approved: 0, rejected: 0, total: 0 };
  }
}

/**
 * Activity item structure
 */
export interface ActivityItem {
  action: string;
  user: string;
  property?: string;
  time: string;
}

/**
 * Get recent activity for the admin dashboard
 */
export async function getRecentActivities(): Promise<ActivityItem[]> {
  try {
    // Get recent property status changes
    // In a real app, you'd have a dedicated 'activities' collection
    // For now, we'll just get the most recently updated properties
    
    const propertiesRef = collection(db, 'properties');
    const q = query(propertiesRef);
    const querySnapshot = await getDocs(q);
    
    const activities: ActivityItem[] = [];
    
    for (const doc of querySnapshot.docs) {
      const property = doc.data() as Property;
      
      // Only include properties that have a status
      if (property.status && property.updatedAt) {
        const actionMap = {
          'approved': 'Approved property',
          'rejected': 'Rejected property',
          'pending': 'Property submitted for review'
        };
        
        const action = actionMap[property.status] || 'Updated property';
        
        // Get the submitter's email if possible (in a real app, you'd join with user data)
        let userEmail = 'User';
        if (property.submittedBy) {
          try {
            interface UserData {
              email?: string;
            }
            const userDoc = await getDoc(doc(db, 'users', property.submittedBy));
            if (userDoc.exists()) {
              const userData = userDoc.data() as UserData;
              userEmail = userData.email || 'User';
            }
          } catch (e) {
            console.error("Error getting user:", e);
          }
        }
        
        activities.push({
          action,
          user: userEmail,
          property: property.title || 'Untitled Property',
          time: new Date(property.updatedAt).toLocaleString()
        });
      }
    }
    
    // Sort by date (most recent first) and limit to 10
    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);
  } catch (error) {
    console.error("Error getting recent activities:", error);
    return [];
  }
}