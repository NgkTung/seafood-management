import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// charts
import { StockByLocationChart } from "./charts/stock-by-location";
import { OrdersChart } from "./charts/orders";
import { QCResultChart } from "./charts/qc-result";
import { RevenueChart } from "./charts/revenue";
import { StorageUtilizationChart } from "./charts/storage-utilization";
import { ShipmentsChart } from "./charts/shipments";

// kpis
import { KpiCard } from "@/components/kpi-card";

// queries
import { getStockByLocation } from "@/lib/queries/stock";
import { getOrdersPerMonth, getRevenuePerMonth } from "@/lib/queries/orders";
import { getQCResultSummary } from "@/lib/queries/qc";
import {
  getTotalInventory,
  getOrdersThisMonth,
  getRevenueThisMonth,
} from "@/lib/queries/kpi";
import { getStorageUtilization } from "@/lib/queries/storage";
import { getShipmentsPerMonth } from "@/lib/queries/shipment";

export default async function DashboardPage() {
  const [
    stockData,
    orderData,
    revenueData,
    qcData,
    inventoryTotal,
    ordersThisMonth,
    revenueThisMonth,
    storageUtilization,
    shipmentData,
  ] = await Promise.all([
    getStockByLocation(),
    getOrdersPerMonth(),
    getRevenuePerMonth(),
    getQCResultSummary(),
    getTotalInventory(),
    getOrdersThisMonth(),
    getRevenueThisMonth(),
    getStorageUtilization(),
    getShipmentsPerMonth(),
  ]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Inventory" value={inventoryTotal} />
        <KpiCard title="Orders This Month" value={ordersThisMonth} />
        <KpiCard title="Revenue This Month" value={`$${revenueThisMonth}`} />
        <KpiCard title="QC Pass Rate" value={`${qcData[0]?.value ?? 0}%`} />
      </div>

      {/* INVENTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stock by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <StockByLocationChart data={stockData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <StorageUtilizationChart data={storageUtilization} />
          </CardContent>
        </Card>
      </div>

      {/* ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersChart data={orderData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>
      </div>

      {/* QC + LOGISTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>QC Results</CardTitle>
          </CardHeader>
          <CardContent>
            <QCResultChart data={qcData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipments per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ShipmentsChart data={shipmentData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
