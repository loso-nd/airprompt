"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
          {children}
    </SessionProvider>
  )
}

export default Provider;

// This is a high order component so we will wrap other components within it
// Using browsers capabilities