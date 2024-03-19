import React from 'react';

import type { HeadFC, PageProps } from 'gatsby';

import Layout from 'hoc/Layout/Layout';
import Seo from 'hoc/Seo/Seo';

const Index: React.FC<PageProps> = () => {
	return <Layout>Home</Layout>;
};

export default Index;

export const Head: HeadFC = () => <Seo title='Home' />;
