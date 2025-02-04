"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

// Registrasi chart.js
ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface PaymentDataItem {
  date: Date;
  jumlah: number;
}

export interface PaymentDataGroup {
  jenis: string;
  totalTransaksi: number;
  detail: PaymentDataItem[];
}

function generateDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

type TrendChartProps = {
  dataSource: PaymentDataGroup[];
  paymentType: string;
  label?: string;
  dateStart?: Date;
  dateEnd?: Date;
};

export function TrendChart({
  dataSource,
  paymentType,
  label,
  dateStart,
  dateEnd,
}: TrendChartProps) {
  // Menggabungkan detail data
  const combinedDetails = useMemo(() => {
    if (paymentType === "all") {
      let allDetails: PaymentDataItem[] = [];
      dataSource.forEach((group) => {
        allDetails = allDetails.concat(group.detail);
      });
      return allDetails;
    } else {
      const found = dataSource.find((x) => x.jenis === paymentType);
      return found ? found.detail : [];
    }
  }, [dataSource, paymentType]);

  // Filter date range
  const filteredByDate = useMemo(() => {
    if (!dateStart || !dateEnd) return combinedDetails;
    return combinedDetails.filter((item) => {
      const d = item.date;
      return d >= dateStart && d <= dateEnd;
    });
  }, [combinedDetails, dateStart, dateEnd]);

  // Summation jika "all"
  const summedData = useMemo(() => {
    if (paymentType !== "all") {
      return [...filteredByDate].sort((a, b) => +a.date - +b.date);
    }
    const mapDate: Record<string, number> = {};
    filteredByDate.forEach((item) => {
      const key = item.date.toISOString().split("T")[0];
      mapDate[key] = (mapDate[key] || 0) + item.jumlah;
    });
    const arr = Object.entries(mapDate).map(([k, v]) => ({
      date: new Date(k),
      jumlah: v,
    }));
    arr.sort((a, b) => +a.date - +b.date);
    return arr;
  }, [filteredByDate, paymentType]);

  // Generate range + fill 0
  const finalData = useMemo(() => {
    if (!dateStart || !dateEnd) return summedData;
    const range = generateDateRange(dateStart, dateEnd);

    const dateMap = new Map<string, number>();
    for (const item of summedData) {
      const key = item.date.toISOString().split("T")[0];
      dateMap.set(key, item.jumlah);
    }
    return range.map((d) => {
      const key = d.toISOString().split("T")[0];
      const jumlah = dateMap.get(key) || 0;
      return { date: d, jumlah };
    });
  }, [summedData, dateStart, dateEnd]);

  // Data chart: gunakan x=Date, y=jumlah
  const chartData = useMemo(() => {
    return {
      datasets: [
        {
          label: "Jumlah Transaksi",
          data: finalData.map((item) => ({
            x: item.date,
            y: item.jumlah,
          })),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.2,
        },
      ],
    };
  }, [finalData]);

  // Judul multiline
  const chartTitle = useMemo(() => {
    if (!dateStart || !dateEnd) {
      return "Jumlah Transaksi Pembayaran";
    }
    const fmtOpts: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    const startStr = dateStart.toLocaleString("id-ID", fmtOpts);
    const endStr = dateEnd.toLocaleString("id-ID", fmtOpts);
    const line1 = `Jumlah Transaksi Pembayaran Periode ${startStr} s.d. ${endStr}`;
    const typedLabel = paymentType === "all" ? "Semua Jenis Pembayaran" : label || "";
    const line2 = `Penerimaan ${typedLabel}`;
    return [line1, line2];
  }, [dateStart, dateEnd, paymentType, label]);

  // Inilah bedanya: definisikan tipe ChartOptions<"line">
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time" as const, // Pastikan "as const"
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Tanggal Transaksi",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Jumlah Transaksi",
        },
      },
    },
  };

  // Tabel ringkasan (jika all)
  const totalTransaksiAll = useMemo(() => {
    return dataSource.reduce((acc, item) => acc + item.totalTransaksi, 0);
  }, [dataSource]);

  return (
    <>
      {dateStart && dateEnd && (
        <div className="flex flex-col lg:flex-row w-full max-w-[1000px] gap-4">
          <div className="w-full">
            <Line data={chartData} options={options} />
          </div>

          {paymentType === "all" && (
            <table className="border-collapse border text-sm w-full lg:w-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-center">Jenis Pembayaran</th>
                  <th className="border p-2 text-center">Jumlah Transaksi</th>
                </tr>
              </thead>
              <tbody>
                {dataSource.map((item) => (
                  <tr key={item.jenis}>
                    <td className="border p-2">{item.jenis}</td>
                    <td className="border p-2 text-center">{item.totalTransaksi}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border p-2 font-semibold">Total</td>
                  <td className="border p-2 text-center font-semibold">
                    {totalTransaksiAll}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {paymentType !== "all" && (
            <p>
              Jumlah Transaksi {label}:{" "}
              {finalData.reduce((acc, cur) => acc + cur.jumlah, 0)}
            </p>
          )}
        </div>
      )}
    </>
  );
}
