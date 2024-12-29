import { SWAPI_BASE_URL } from "@/app/constants";
import { Character } from "@/app/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
  const { result: character } = await response.json();
  const { properties, description } = character;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{properties.name}</h1>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <table
        border={1}
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(properties).map(([key, value]) => (
            <tr key={key}>
              <td>
                <strong>{key.replace("_", " ")}</strong>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
