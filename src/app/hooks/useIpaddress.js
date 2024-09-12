 export const useIpaddress=async()=>{
    try {
        const response = await fetch('https://api.ipify.org');
    const data = await response.text();
    console.log(data);
    
    // return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
} 
