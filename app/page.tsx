import Card from "@/components/card";
import { getImage } from "@/lib/data";
import Link from "next/link";

const Home = async() => {
  const data = await getImage();

  return (
    <div className="max-w-screen-lg mx-auto py-14 ">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h1 className="text-4xl font-bold ">Latest Image</h1>
        <Link href="/create" className="bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-bold py-3 px-6">Upload</Link>
      </div>
      {/* Contents */}
      <div className="grid md:grid-cols-3 mt-10 gap-8">
       {
        data.map((item) =>(
          <Card key={item.id} data={item} />
        ))
       }
      </div>
    </div>
  );
}

export default Home;