import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './processingPlan.css';

function ProcessingPlan({ selectedWeek }) {
  // State to hold client data
  const [clients, setClients] = useState([]);
  // State to hold SKU data
  const [skus, setSKUs] = useState([]);
  // State to hold processing plans data
  const [forecasted, setProcessingPlans] = useState([]);
  // State to hold processed SKUs data
  const [processed, setProcessedSKUs] = useState([]);

  // useEffect runs when the component is mounted
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
        // Set the fetched processing plan data in state
        setProcessingPlans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching processing plans:', error);
      });

    // Fetch the processed SKUs when the component mounts
    axios.get('http://localhost:5000/processed')
      .then((response) => {
        // Set the fetched processed SKUs data in state
        setProcessedSKUs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching processed SKUs:', error);
      });
  }, []);

  const calculatePendingUnits = (skuId) => {
    const forecastForWeek = forecasted.find((forecast) => forecast.sku_id === skuId && forecast.week_id === selectedWeek);
    const processedForWeek = processed.find((processedItem) => processedItem.sku_id === skuId && processedItem.week_id === selectedWeek);

    const forecastQuantity = forecastForWeek ? forecastForWeek.quantity : 0;
    const processedQuantity = processedForWeek ? processedForWeek.quantity_processed : 0;

    return forecastQuantity - processedQuantity;
  };

  return (
    <div className="ProcessingPlan">
      <h2>Client Names</h2>
      <div className="client-list">
        {clients.map((client) => (
          <div key={client.client_id} className="client-sku-container">
            <div className="client-name">{client.client_name}</div>
            <div className='sku-name-list'>
              {skus
                .filter((sku) => sku.client_id === client.client_id)
                .sort((a, b) => a.sku_name.localeCompare(b.sku_name))
                .map((sku) => (
                  <div className="sku-name" key={sku.sku_id}>
                    <Link
                      to={`/weeks/${selectedWeek}/${sku.sku_id}/processing-submission`}
                      className="sku-link"
                      style={{ textDecoration: 'none' }}
                    >
                      <em>{sku.sku_name}</em>
                      <em> <strong>{sku.sku_size}</strong></em>
                      <div className="quantity-info">
                        <p>
                          {calculatePendingUnits(sku.sku_id)} units pending
                        </p>
                      </div>
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
