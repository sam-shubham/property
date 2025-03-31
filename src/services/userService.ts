import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// User statistics interface
export interface UserStatistics {
  total: number;
  sellers: number;
  agents: number;
  buyers: number;
}

/**
 * Get user statistics (counts by role)
 */
export async function getUserStatistics(): Promise<UserStatistics> {
  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    const total = usersSnapshot.docs.length;
    
    // Count users by type
    let sellers = 0;
    let agents = 0;
    let buyers = 0;
    
    usersSnapshot.docs.forEach(doc => {
      const userData = doc.data();
      if (userData.userType === 'seller') {
        sellers++;
      } else if (userData.userType === 'agent') {
        agents++;
      } else {
        // Default to buyer if no type or type is buyer
        buyers++;
      }
    });
    
    return {
      total,
      sellers,
      agents,
      buyers
    };
  } catch (error) {
    console.error("Error getting user statistics:", error);
    // Return empty stats on error rather than throwing
    return { total: 0, sellers: 0, agents: 0, buyers: 0 };
  }
}

export const getUsers = async (role = 'all') => {
  try {
    let usersQuery;
    
    if (role !== 'all') {
      usersQuery = query(collection(db, 'users'), where('userType', '==', role));
    } else {
      usersQuery = collection(db, 'users');
    }
    
    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};