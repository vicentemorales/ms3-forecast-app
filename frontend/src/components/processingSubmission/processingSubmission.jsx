import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./processingSubmission.css";

function ProcessingSubmission({ selectedWeek }) {
  // State to hold form input values
  const [formData, setFormData] = useState({
    quantityProcessed: "",
    processedNotes: "",
    processedBy: "",
  });

  // Route parameters
  const { weekId, skuId } = useParams();

  // State to hold client and SKU data
  const [client, setClient] = useState(null);
  const [sku, setSku] = useState(null);

  // Effect to fetch client and SKU data based on route parameters
  useEffect(() => {
    // Fetch client data based on the selectedWeek and weekId
    axios
      .get(`http://localhost:5000/weeks/${selectedWeek}`)
      .then((response) => {
        console.log("Client data response:", response.data); // Debugging output

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          // Find the client data for the selected week
          const clientData = response.data.find(
            (data) => data.primary_id === Number(weekId)
          );
          if (clientData) {
            setClient(clientData);
          } else {
            console.error("Client data not found for the selected week");
          }
        } else if (typeof response.data === "object") {
          // Check if response is an object
          setClient(response.data); // Set the object as the client state
        } else {
          console.error("Client data response is not an array or object");
        }
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });

    // Fetch SKU data based on skuId
    axios
      .get(`http://localhost:5000/skus/${skuId}`)
      .then((response) => {
        console.log("SKU data response:", response.data); // Debugging output

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          // Find the SKU data for the selected SKU
          const skuData = response.data.find(
            (data) => data.sku_id === Number(skuId)
          );
          if (skuData) {
            setSku(skuData);
          } else {
            console.error("SKU data not found for the selected SKU");
          }
        } else if (typeof response.data === "object") {
          // Check if response is an object
          setSku(response.data); // Set the object as the SKU state
        } else {
          console.error("SKU data response is not an array or object");
        }
      })
      .catch((error) => {
        console.error("Error fetching SKU data:", error);
      });
  }, [selectedWeek, weekId, skuId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const postData = {
      week_id: Number(weekId),
      sku_id: Number(skuId),
      quantity_processed: Number(formData.quantityProcessed),
      processed_notes: formData.processedNotes,
      processed_by: formData.processedBy,
    };

    // Make a POST request to store the data
    axios
      .post("http://localhost:5000/processed", postData)
      .then((response) => {
        // Handle success (you can redirect or show a success message)
        console.log("Data submitted successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="processing-submission">
      <h2>Processing Submission</h2>
      {client && sku && (
        <div>
          <p>
            Selected Week: <strong>{client.week}</strong>
          </p>
          <p style={{display: 'none'}}>
            Client Name: <strong>{client.client_name}</strong>
          </p>
          <p>
            SKU Name: <strong>{sku.sku_name}</strong>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="quantityProcessed">Quantity Processed:</label>
              </td>
              <td>
                <input
                  type="number"
                  id="quantityProcessed"
                  name="quantityProcessed"
                  value={formData.quantityProcessed}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="processedNotes">Notes:</label>
              </td>
              <td>
                <textarea
                  id="processedNotes"
                  name="processedNotes"
                  value={formData.processedNotes}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="processedBy">Processed By:</label>
              </td>
              <td>
                <input
                  type="text"
                  id="processedBy"
                  name="processedBy"
                  value={formData.processedBy}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProcessingSubmission;
