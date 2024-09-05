import GlobalLayout from "../components/layout/globalLayout";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
