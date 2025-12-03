"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [permissions, setPermissions] = useState<string[] | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((x) => x.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      const decoded: any = jwtDecode(token);
      setPermissions(decoded.permissions || []);
    }
  }, []);

  if (!permissions) return "Loading...";

  const can = (perm: string) => {
    if (permissions.includes("*")) return true; // admin shortcut
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
