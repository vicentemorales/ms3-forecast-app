import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './processingPlan.css'

function ProcessingPlan({ selectedWeek }) {
  // State to hold client data
  const [clients, setClients] = useState([]);
  // State to hold SKU data
  const [skus, setSKUs] = useState([]);
  // State to hold processing plans data
  const [processingPlans, setProcessingPlans] = useState([]);

  useEffect(() => {
    // Fetch client data when the component mounts
    axios.get('http://localhost:5000/clients')
      .then((response) => {
        // Set the fetched client data in state
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });

    // Fetch SKU data when the component mounts
    axios.get('http://localhost:5000/skus')
      .then((response) => {
        // Set the fetched SKU data in state
        setSKUs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skus:', error);
      });

    // Fetch the production plan when the component mounts
    axios.get('http://localhost:5000/processing-plan')
      .then((response) => {
        setProcessingPlans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching processing plans:', error);
      });
  }, []);

  return (
    <div className="ProcessingPlan">
      <h2>Client Names</h2>
      <div className="client-list">
        {/* Map through and alphabetize the clients and generate a div for each client */}
        {clients
          .sort((a, b) => a.client_name.localeCompare(b.client_name))
          .map((client) => (
            <div key={client.client_id} className='client-sku-container'>
              <div className="client-name">
                {client.client_name}
              </div>
              <div className='sku-name-list'>
                {/* Map through the SKUs and generate a div for each SKU that belongs to the current client */}
                {skus
                  .filter((sku) => sku.client_id === client.client_id)
                  .sort((a, b) => a.sku_name.localeCompare(b.sku_name))
                  .map((sku) => (
                    <div className="sku-name" key={sku.sku_id}>
                      <Link
                        to={`/weeks/${selectedWeek}/${sku.sku_id}/processing-submission`}
                        className="sku-link"
                        style={{textDecoration: 'none'}}
                      >
                        <em>{sku.sku_name}</em>
                        <em> <strong>{sku.sku_size}</strong></em>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProcessingPlan;
