import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Challange from "./features/Challange/Challange";

import * as colors from "./constants/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main
        style={{
          background: colors.BG,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Challange />
      </main>
    </QueryClientProvider>
  );
}

export default App;

