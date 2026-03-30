export async function POST(request) {
  try {
    const body = await request.json();
    const text = body?.text || "";

    if (!text.trim()) {
      return Response.json(
        { error: "Please Enter Text" },
        { status: 400 }
      );
    }

    const reversedText = text.split("").reverse().join("");

    return Response.json(
      { result: reversedText },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}