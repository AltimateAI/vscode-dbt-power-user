const fetch = require("node-fetch");
const EventSource = require("eventsource");

// Configuration
const SSE_URL = "http://localhost:7891/sse";
const MESSAGES_URL = "http://localhost:7891/messages";

console.log("DBT Power User MCP Test Client");
console.log("------------------------------");
console.log(`Connecting to SSE endpoint: ${SSE_URL}`);

let connectionId = null;

// Connect to SSE endpoint
const eventSource = new EventSource(SSE_URL);

eventSource.onopen = () => {
  console.log("SSE connection opened");
};

eventSource.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  console.log("Received message:", JSON.stringify(data, null, 2));

  // Check if this is a connection response
  if (data.type === "connection_response") {
    connectionId = data.connection_id;
    console.log(`Connection established with ID: ${connectionId}`);

    // Once connected, test the get_projects function
    await testGetProjects();

    // Close the connection after testing
    eventSource.close();
    console.log("Test completed. Connection closed.");
  }
};

eventSource.onerror = (error) => {
  console.error("SSE connection error:", error);
  eventSource.close();
  process.exit(1);
};

// Test the get_projects function
async function testGetProjects() {
  if (!connectionId) {
    console.error("Not connected to server");
    return;
  }

  try {
    console.log("Sending get_projects request");

    const response = await fetch(MESSAGES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        connection_id: connectionId,
        type: "function_call",
        function_name: "get_projects",
        arguments: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(
      "Received response from get_projects:",
      JSON.stringify(result, null, 2),
    );
    return result;
  } catch (error) {
    console.error("Error calling get_projects:", error.message);
  }
}
