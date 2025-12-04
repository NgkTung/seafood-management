"use client";

import { useProfile } from "@/hooks/auth/profile";

export default function Dashboard() {
  const { data, isLoading } = useProfile();

  if (isLoading) return "Loading...";
  if (!data?.user) return "Unauthorized";

  const permissions = data.user.permissions || [];

  const can = (perm: string) => {
    if (permissions.includes("*")) return true;
    return permissions.includes(perm);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* QC Section */}
      {can("qc.create") && (
        <section>
          <h2>Quality Control</h2>
          <button>Create QC Inspection</button>
          <button>View Batches</button>
        </section>
      )}

      {/* Inventory */}
      {can("inventory.manage") && (
        <section>
          <h2>Inventory Management</h2>
          <button>View Inventory</button>
          <button>Storage Locations</button>
        </section>
      )}

      {/* Orders */}
      {can("order.create") && (
        <section>
          <h2>Sales & Orders</h2>
          <button>Create Export Order</button>
          <button>Customers</button>
        </section>
      )}

      {/* Export Manager */}
      {can("order.approve") && (
        <section>
          <h2>Approvals</h2>
          <button>Approve Orders</button>
        </section>
      )}

      {/* Reports */}
      {can("reports.view") && (
        <section>
          <h2>Reports</h2>
          <button>View Reports</button>
          <button>Dashboard</button>
        </section>
      )}

      {/* Shipment */}
      {can("shipment.manage") && (
        <section>
          <h2>Logistics</h2>
          <button>Create Shipment</button>
          <button>Documents</button>
        </section>
      )}

      {/* IT Support */}
      {can("users.manage") && (
        <section>
          <h2>System Management</h2>
          <button>User Management</button>
        </section>
      )}

      {/* Intern */}
      {permissions.length === 0 && (
        <section>
          <h2>Read Only</h2>
          <p>You only have view permissions.</p>
        </section>
      )}
    </div>
  );
}
