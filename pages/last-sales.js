import React, { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://udemy-next-dc7d1-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load!</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch("https://udemy-next-dc7d1-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!sales) {
  //   return <p>No data!</p>;
  // }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // return fetch(
  //   "https://udemy-next-dc7d1-default-rtdb.firebaseio.com/sales.json"
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const transformedSales = [];

  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       });
  //     }

  //     return {
  //       props: {
  //         sales: transformedSales,
  //       },
  //       revalidate: 10,
  //     };
  //   });

  const response = await fetch(
    "https://udemy-next-dc7d1-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
