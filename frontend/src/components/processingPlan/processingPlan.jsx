import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './processingPlan.css'

function ProcessingPlan() {
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

        //Fetch the production plan component mounts
        axios.get('http://localhost:5000/production-plan')
        .then((response) => {
          setProcessingPlans(response.data);
        })
        .catch((error) => {
          console.error('Error fetching processing plans:', error);
        });
    }, []);

    
    // Function to determine background color
    const getBackgroundColor = (skuName, index) => {
        // Check if the current SKU has the same name as the previous SKU
        if (index > 0 && skus[index - 1].sku_name === skuName) {
          // Use the same background color as the previous SKU
          return index % 2 === 0 ? 'background-white' : 'background-gray';
        } else {
          // Start a new background color
          return index % 2 === 0 ? 'background-white' : 'background-gray';
        }
      };

  return (
    <div className="ProcessingPlan">
      <h2>Client Names</h2>
      <div className="client-list">
        {/* Map through and aplhabetizes the clients and generate a div for each client */}
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
                    <div key={sku.sku_id} className="sku-name">
                      <em>{sku.sku_name} </em>
                      <em> <strong>{sku.sku_size}</strong></em>
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
