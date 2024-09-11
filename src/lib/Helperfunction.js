// utils/getIpAddress.js
export const getIpAddress = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ipAddress = forwarded ? forwarded.split(',').pop() : req.socket.remoteAddress;
    
    return ipAddress;
  };
  