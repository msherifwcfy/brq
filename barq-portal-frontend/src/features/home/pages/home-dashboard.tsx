import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import { useLang } from "@/shared/hooks/use-lang";

export default function HomeDashboard() {
  const { t } = useLang();
  return (
    <DashboardLayout title="dashboard.titles.home">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-xl bg-card border">
          <h2 className="text-lg font-semibold">
            {t("dashboard.home.welcome")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {t("dashboard.home.overview")}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-card border">
          <h2 className="text-lg font-semibold">
            {t("dashboard.home.quickLinks")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="text-primary underline" href="/dashboard/roles">
                {t("dashboard.home.manageRoles")}
              </a>
            </li>
            <li>
              <a className="text-primary underline" href="/dashboard/employees">
                {t("dashboard.home.manageEmployees")}
              </a>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-xl bg-card border">
          <h2 className="text-lg font-semibold">
            {t("dashboard.home.status")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {t("dashboard.home.systemNormal")}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
