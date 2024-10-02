/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol : "https",
                hostname : "4zoiqfnaa63yymt8.public.blob.vercel-storage.com"
            }
        ]
        
    }
};

export default nextConfig;
