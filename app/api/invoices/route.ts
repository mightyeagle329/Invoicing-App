import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const invoices = await Invoice.find();
    return NextResponse.json({ invoices }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching invoices", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log("Raw request body:", request.body);

  try {
    const body = await request.json();
    console.log("Parsed request body:", body);
    const invoiceData = body;
    console.log("Invoice data to be saved:", invoiceData);

    await Invoice.create(invoiceData);

    return NextResponse.json({ message: "Invoice created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating invoice", error },
      { status: 500 }
    );
  }
}

/* export async function POST(request: Request) {
  try {
    await connec;
    const client = await clientPromise;
    const db = client.db("InvoicingApp");
    const invoice = req.body;
    const result = await db.collection("invoices").insertOne(invoice);
    res.status(201).json({
      message: "Invoice submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit invoice", error });
  }
} */