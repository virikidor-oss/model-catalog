import { NextRequest, NextResponse } from "next/server";
import { deleteReview } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";
import { mockReviews } from "@/lib/mock-data";


  return mockReviews.map((review) => ({
    id: review.id,
  }));
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  await deleteReview(id);
  return NextResponse.json({ success: true });
}
