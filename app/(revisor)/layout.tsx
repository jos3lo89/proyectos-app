import HeaderRevisor from "@/components/projects-revisor/HeaderRevisor";

const RevisorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderRevisor />
      {children}
    </>
  );
};
export default RevisorLayout;
