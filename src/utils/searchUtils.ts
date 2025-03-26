/**
 * Searches properties based on a query string
 * Searches across title, location, description, and developer fields
 */
export const searchProperties = (properties: any[], query: string) => {
  if (!query || query.trim() === '') {
    return properties;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return properties.filter(property => {
    // Search in different fields
    return (
      (property.title && property.title.toLowerCase().includes(searchTerm)) ||
      (property.location && property.location.toLowerCase().includes(searchTerm)) ||
      (property.description && property.description.toLowerCase().includes(searchTerm)) ||
      (property.developer && property.developer.toLowerCase().includes(searchTerm)) ||
      (property.id && property.id.toLowerCase().includes(searchTerm))
    );
  });
};

/**
 * Filters properties based on filter criteria
 */
export const filterProperties = (properties: any[], filters: any) => {
  if (!filters || Object.keys(filters).length === 0) {
    return properties;
  }
  
  return properties.filter(property => {
    let matches = true;
    
    // Filter by price
    if (filters.price && filters.price !== 'Any Price') {
      if (filters.price === 'Under ₹50L' && property.price >= 5000000) {
        matches = false;
      } else if (filters.price === '₹50L - ₹1Cr' && (property.price < 5000000 || property.price >= 10000000)) {
        matches = false;
      } else if (filters.price === '₹1Cr - ₹2Cr' && (property.price < 10000000 || property.price >= 20000000)) {
        matches = false;
      } else if (filters.price === 'Above ₹2Cr' && property.price < 20000000) {
        matches = false;
      } else if (filters.price === 'Under ₹5Cr' && property.price >= 50000000) {
        matches = false;
      } else if (filters.price === '₹5Cr - ₹8Cr' && (property.price < 50000000 || property.price >= 80000000)) {
        matches = false;
      } else if (filters.price === '₹8Cr - ₹12Cr' && (property.price < 80000000 || property.price >= 120000000)) {
        matches = false;
      } else if (filters.price === 'Above ₹12Cr' && property.price < 120000000) {
        matches = false;
      } else if (filters.price === 'Under ₹15k/mo' && property.price >= 15000) {
        matches = false;
      } else if (filters.price === '₹15k-₹25k/mo' && (property.price < 15000 || property.price >= 25000)) {
        matches = false;
      } else if (filters.price === '₹25k-₹50k/mo' && (property.price < 25000 || property.price >= 50000)) {
        matches = false;
      } else if (filters.price === '₹50k+/mo' && property.price < 50000) {
        matches = false;
      }
    }
    
    // Filter by BHK
    if (filters.bhk && filters.bhk !== 'Any BHK' && filters.bhk !== 'BHK Type') {
      const bhkValue = parseInt(filters.bhk.split(' ')[0]);
      if (filters.bhk.includes('+')) {
        if (property.bedrooms < bhkValue) matches = false;
      } else {
        if (property.bedrooms !== bhkValue) matches = false;
      }
    }
    
    // Filter by City/Location
    if (filters.city && filters.city !== 'Any City') {
      if (!property.location.includes(filters.city)) matches = false;
    }
    
    // Filter by Area
    if (filters.area && filters.area !== 'Any Area') {
      if (filters.area === 'Under 1000 sq.ft' && property.area >= 1000) {
        matches = false;
      } else if (filters.area === '1000-2000 sq.ft' && (property.area < 1000 || property.area >= 2000)) {
        matches = false;
      } else if (filters.area === 'Above 2000 sq.ft' && property.area < 2000) {
        matches = false;
      }
    }
    
    // Filter by Land Area (for farm houses)
    if (filters.landArea && filters.landArea !== 'Any Land Area') {
      const acres = property.landArea / 43560; // Convert sq.ft to acres
      if (filters.landArea === '1-2 Acres' && (acres < 1 || acres >= 2)) {
        matches = false;
      } else if (filters.landArea === '2-5 Acres' && (acres < 2 || acres >= 5)) {
        matches = false;
      } else if (filters.landArea === '5-10 Acres' && (acres < 5 || acres >= 10)) {
        matches = false;
      } else if (filters.landArea === 'Above 10 Acres' && acres < 10) {
        matches = false;
      }
    }
    
    // Filter by Type
    if (filters.type && filters.type !== 'all' && filters.type !== 'Any Type') {
      if (property.category !== filters.type.toLowerCase() && property.type !== filters.type.toLowerCase()) {
        matches = false;
      }
    }
    
    // Filter by Developer
    if (filters.developer && filters.developer !== 'Any Developer') {
      if (property.developer !== filters.developer) matches = false;
    }
    
    // Filter by Status
    if (filters.status && filters.status !== 'Any Status') {
      if (property.completionDate !== filters.status && 
          !(filters.status === 'Ready to Move' && property.completionDate === 'Ready to Move') &&
          !(filters.status === 'Under Construction' && property.completionDate !== 'Ready to Move')) {
        matches = false;
      }
    }
    
    // Filter by Furnishing (for rentals)
    if (filters.furnishing && filters.furnishing !== 'Furnishing') {
      if (property.furnishing !== filters.furnishing) matches = false;
    }
    
    return matches;
  });
};

/**
 * Sorts properties based on sort criteria
 */
export const sortProperties = (properties: any[], sortOption: string) => {
  const propertiesCopy = [...properties];
  
  switch (sortOption) {
    case 'Price: Low to High':
      return propertiesCopy.sort((a, b) => a.price - b.price);
    case 'Price: High to Low':
      return propertiesCopy.sort((a, b) => b.price - a.price);
    case 'Newest First':
      return propertiesCopy.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'Land Area: Large to Small':
      return propertiesCopy.sort((a, b) => (b.landArea || 0) - (a.landArea || 0));
    case 'Completion Date':
      return propertiesCopy.sort((a, b) => {
        if (a.completionDate === 'Ready to Move' && b.completionDate !== 'Ready to Move') return -1;
        if (a.completionDate !== 'Ready to Move' && b.completionDate === 'Ready to Move') return 1;
        return 0;
      });
    case 'Most Popular':
      // If you have a popularity metric, use it here
      return propertiesCopy;
    default:
      return propertiesCopy;
  }
};