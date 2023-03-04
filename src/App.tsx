import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { PostList, PostCreate, PostEdit } from "pages/posts";

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      authProvider={authProvider}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
        },
      ]}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      LoginPage={() => (
        <AuthPage
          type="login"
          providers={[
            {
              name: "google",
              label: "Sign in with Google",
            },
          ]}
          formProps={{
            initialValues: {
              email: "info@refine.dev",
              password: "refine-supabase",
            },
          }}
        />
      )}
    />
  );
}

export default App;
