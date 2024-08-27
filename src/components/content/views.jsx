import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Views = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/playlist/');
        const data = await response.json();
        console.log('API Data:', data);
        if (Array.isArray(data)) {
          prepareChartData(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const labels = data.map(item => item.name || 'Unknown'); // Fallback to 'Unknown' if name is undefined
      const watchedCounts = data.map(item => parseInt(item.watched, 10) || 0); // Convert watched to integer and fallback to 0 if invalid

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Lượt xem',
            data: watchedCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ],
      });
    } else {
      console.error('Invalid data format or empty array');
      setChartData({ labels: [], datasets: [] });
    }
  };

  return (
    <div>
      <h2>Thống kê lượt xem</h2>
      <div style={{ width: '180vh', margin: '50px 0 0 -80px' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ': ' + context.raw;
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Danh sách video'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Lượt xem'
                },
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Views;
