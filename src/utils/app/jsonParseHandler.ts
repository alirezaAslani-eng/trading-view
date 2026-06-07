
export default async function jsonParseHandler<T = unknown>(
  res: Response,
): Promise<T | undefined> {
  try {
    const json_data = await res.json();
    return json_data;
  } catch (err) {
    console.error("JSON_PARSE_ERROR -> ", err);
    return undefined;
  }
}
