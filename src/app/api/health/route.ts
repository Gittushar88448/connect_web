import dbConnect from '@/lib/dbConnect';

export async function GET() {
  await dbConnect();
  return Response.json({
    database_connection: "Healthy" ,
    Current_date: new Date(Date.now())
  });
}