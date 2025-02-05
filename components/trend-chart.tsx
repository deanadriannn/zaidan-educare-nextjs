"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Tipe data item
export interface PaymentDataItem {
  date: Date;   
  jumlah: number;
}

// Tipe data group
export interface PaymentDataGroup {
  jenis: string;
  totalTransaksi: number;
  detail: PaymentDataItem[];
}

type TrendChartProps = {
  dataSource: PaymentDataGroup[];
  paymentType: string;        
  label?: string;
  /** Misal user pilih "Januari 2025" => dateStart = 2025-01-01 */
  dateStart?: Date;           
  /** Misal user pilih "Januari 2025" => dateEnd   = 2025-01-31 */
  dateEnd?: Date;             
};

// Fungsi helper: kembalikan “last day of month”
function lastDayOfMonth(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth();
  // set ke tgl 1 di bulan d, +1 bulan, lalu 0 => last day
  return new Date(year, month + 1, 0);
}

export function TrendChart({
  dataSource,
  paymentType,
  label,
  dateStart,
  dateEnd,
}: TrendChartProps) {

  // 0) Normalisasi agar misal start=2025-01-01 => end=2025-01-31
  //    (Jika mau dipaksa full satu bulan)
  const normalizedStart = useMemo(() => {
    if (!dateStart) return undefined;
    const d = new Date(dateStart.getFullYear(), dateStart.getMonth(), 1);
    return d;
  }, [dateStart]);

  const normalizedEnd = useMemo(() => {
    if (!dateEnd) return undefined;
    // misalnya user pilih "Januari 2025" => dateEnd=2025-01-01 => kita jadikan last day of january
    return lastDayOfMonth(dateEnd);
  }, [dateEnd]);

  // 1) Gabungkan detail data
  const combinedDetails = useMemo(() => {
    if (paymentType === "all") {
      let all: PaymentDataItem[] = [];
      dataSource.forEach(g => {
        all = all.concat(g.detail);
      });
      return all;
    } else {
      const found = dataSource.find(x => x.jenis === paymentType);
      return found ? found.detail : [];
    }
  }, [dataSource, paymentType]);

  // 2) Filter by date range
  const filteredDetails = useMemo(() => {
    if (!normalizedStart || !normalizedEnd) return combinedDetails;
    return combinedDetails.filter(item => {
      const d = item.date;
      return d >= normalizedStart && d <= normalizedEnd;
    });
  }, [combinedDetails, normalizedStart, normalizedEnd]);

  // 3) Cari month range => maxDay
  const monthRange = useMemo(() => {
    if (!normalizedStart || !normalizedEnd) return [];
    // misal user pilih jan->maret => 3 entry
    // tapi di snippet ini, kita manual loop day
    const result: { year: number; month: number }[] = [];
    let cur = new Date(normalizedStart);
    while (cur <= normalizedEnd) {
      result.push({ year: cur.getFullYear(), month: cur.getMonth() });
      cur.setMonth(cur.getMonth() + 1, 1); 
    }
    return result;
  }, [normalizedStart, normalizedEnd]);

  function daysInMonth(year: number, month0: number) {
    return new Date(year, month0 + 1, 0).getDate();
  }

  const maxDay = useMemo(() => {
    let m = 0;
    for (const { year, month } of monthRange) {
      const dd = daysInMonth(year, month);
      if (dd > m) m = dd;
    }
    return m; 
  }, [monthRange]);

  // 4) Summation day=1..maxDay
  const finalData = useMemo(() => {
    if (!monthRange.length) return [];
    const result: { day: number; jumlah: number }[] = [];
    for (let day = 1; day <= maxDay; day++) {
      let sum = 0;
      for (const { year, month } of monthRange) {
        const dayItems = filteredDetails.filter(it => (
          it.date.getFullYear() === year &&
          it.date.getMonth() === month &&
          it.date.getDate() === day
        ));
        sum += dayItems.reduce((acc, cur) => acc + cur.jumlah, 0);
      }
      result.push({ day, jumlah: sum });
    }
    return result;
  }, [filteredDetails, monthRange, maxDay]);

  // 5) Chart data => label=1..maxDay
  const chartData = useMemo(() => {
    return {
      labels: finalData.map(d => d.day.toString()),
      datasets: [
        {
          label: "Jumlah Transaksi",
          data: finalData.map(d => d.jumlah),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.2,
        }
      ]
    };
  }, [finalData]);

  // 6) Title
  const chartTitle = useMemo(() => {
    if (!normalizedStart || !normalizedEnd) {
      return "Jumlah Transaksi Pembayaran";
    }
    const opt: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    const startStr = normalizedStart.toLocaleString("id-ID", opt); 
    const endStr   = normalizedEnd.toLocaleString("id-ID", opt);
    const line1 = `Jumlah Transaksi Pembayaran Periode ${startStr} s.d. ${endStr}`;
    const typedLabel = paymentType === "all" ? "Semua Jenis Pembayaran" : label || "";
    const line2 = `Penerimaan ${typedLabel}`;
    return [line1, line2];
  }, [normalizedStart, normalizedEnd, paymentType, label]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          weight: "bold",
          size: 18,
        }
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Tanggal Transaksi",
          font: {
            weight: "bold",
            size: 16,
          }
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Jumlah Transaksi",
          font: {
            weight: "bold",
            size: 16,
          }
        },
      },
    },
  };

  // Tabel ringkasan (jika all)
  const totalTransaksiAll = useMemo(() => {
    return dataSource.reduce((acc, item) => acc + item.totalTransaksi, 0);
  }, [dataSource]);

  if (!normalizedStart || !normalizedEnd) {
    return <p>Data Tidak Ada</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 has-[p]:flex-col">
      <div className="w-full">
        <Line data={chartData} options={options} />
      </div>
      {paymentType === "all" && (
        <div className="h-full">
          <table className="border-collapse border text-sm w-full lg:w-auto h-[400px]">
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
        </div>
      )}

      {paymentType !== "all" && (
        <p>
          Jumlah Transaksi {label}:{" "}
          {finalData.reduce((acc, cur) => acc + cur.jumlah, 0)}
        </p>
      )}
    </div>
  );
}
