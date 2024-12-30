import Header, { HeaderLeft, HeaderRight, HeaderSubTitle, HeaderTitle } from "../_components/header";
import { Button } from "../_components/ui/button";

export default function Home() {
  return (
    <>
      <div className="w-full space-y-8 mx-4 mt-3 p-4 bg-white shadow-lg shadow-black/20 rounded-md">
        <Header>
          <HeaderLeft>
            <HeaderTitle>Dashboard</HeaderTitle>
            <HeaderSubTitle>Visão geral</HeaderSubTitle>
          </HeaderLeft>
          <HeaderRight>
            <Button>Novo</Button>
          </HeaderRight>
        </Header>
      </div>
    </>
  );
}
