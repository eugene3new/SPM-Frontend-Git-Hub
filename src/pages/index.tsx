import React from 'react';
import Layout from '@layout/Layout';
import LayoutContentBody from '@layout/LayoutContentBody';
import { getSession, signOut } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import DashboardMain from '@content/DashboardMain';
import { AuthNextPage } from './_app';

const HomePage: AuthNextPage = () => {
  return (
    <Layout>
      <LayoutContentBody title="scenario_comparison" actions="Actions">
        <DashboardMain />
        {false && (
          <button type="button" onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
            Sign Out
          </button>
        )}
      </LayoutContentBody>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (ctx) => {
  const translations = await import(`../translations/${ctx.locale}.json`);
  return {
    props: {
      session: await getSession(ctx),
      messages: {
        ...translations,
      },
    },
  };
};

export default HomePage;
