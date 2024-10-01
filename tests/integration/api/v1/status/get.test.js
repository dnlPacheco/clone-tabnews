test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const { version, max_connections, opened_connections } =
    responseBody.dependencies?.database;

  expect(version).toBeTruthy();
  expect(version).toEqual("16.0");
  expect(max_connections).toBeTruthy();
  expect(max_connections).toEqual(100);
  expect(opened_connections).toEqual(1);
});
