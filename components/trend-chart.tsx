"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { allPaymentData } from "@/lib/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type PaymentTrendChartProps = {
  paymentType: string; 
  dateStart?: Date;
  dateEnd?: Date;
};

export function TrendChart({
  paymentType,
  dateStart,
  dateEnd,
}: PaymentTrendChartProps) {
  const combinedDetails = useMemo(() => {
    if (paymentType === "all") {
      let allDetails: { date: Date; jumlah: number }[] = [];
      allPaymentData.forEach((item) => {
        allDetails = allDetails.concat(item.detail);
      });
      return allDetails;
    } else {
      const found = allPaymentData.find((x) => x.jenis === paymentType);
      return found ? found.detail : [];
    }
  }, [paymentType]);

  const filteredByDate = useMemo(() => {
    if (!dateStart && !dateEnd) {
      return combinedDetails;
    }

    return combinedDetails.filter((item) => {
      const d = item.date;
      const isAfterStart = dateStart ? d >= dateStart : true;
      const isBeforeEnd = dateEnd ? d <= dateEnd : true;
      return isAfterStart && isBeforeEnd;
    });
  }, [combinedDetails, dateStart, dateEnd]);

  const chartDataArray = useMemo(() => {
    if (paymentType === "all") {
      const mapDate: Record<string, number> = {};

      filteredByDate.forEach((item) => {
        const key = item.date.toISOString().split("T")[0];
        if (!mapDate[key]) {
          mapDate[key] = 0;
        }
        mapDate[key] += item.jumlah;
      });

      const arr = Object.entries(mapDate).map(([k, v]) => ({
        date: new Date(k),
        jumlah: v,
      }));

      arr.sort((a, b) => +a.date - +b.date);
      return arr;
    } else {
      const arr = [...filteredByDate].sort((a, b) => +a.date - +b.date);
      return arr;
    }
  }, [filteredByDate, paymentType]);

  const data = {
    labels: chartDataArray.map((item) => item.date.toLocaleDateString("id-ID")),
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: chartDataArray.map((item) => item.jumlah),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.2,
      },
    ],
  };

  const chartTitle = useMemo(() => {
    if (paymentType === "all") return "Transaksi Pembayaran (Semua Jenis)";
    return `Transaksi Pembayaran - ${paymentType}`;
  }, [paymentType]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: { title: { display: true, text: "Tanggal" } },
      y: { title: { display: true, text: "Jumlah Transaksi" }, beginAtZero: true },
    },
  };

  return (
    <div className="flex gap-4 flex-col lg:flex-row w-full has-[p]:flex-col">
      {/* Chart */}
      <div className="w-full"> 
        <Line data={data} options={options} className="w-full" />
      </div>

      {paymentType === "all" && (
        <table className="border-collapse border text-sm w-full max-w-96 flex-1">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">Jenis Pembayaran</th>
              <th className="border p-2 text-center">Jumlah Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {allPaymentData.map((item) => (
              <tr key={item.jenis}>
                <td className="border p-2">{item.jenis}</td>
                <td className="border p-2 text-center">{item.totalTransaksi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {paymentType !== "all" && (
        <p>
          Jumlah Transaksi {paymentType}: {chartDataArray.length}
        </p>
      )}
    </div>
  );
}
