import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';
import Link from "next/link";

const Home: NextPageWithLayout = () => (
  // <StyledWrapper>   // не нужно, т.к. wrapper у нас в  Layout.tsx
  <>
    <Image
      src="/kusto.png"
      alt="Next.js Logo"
      width={180}
      height={180}
      priority
    />
    <div>
      <Link href={'/login'}>Login</Link>
      <Link href={'/registration'}>Login</Link>
      <Link href={'/recovery'}>Login</Link>
      <Link href={'/newPassword'}>Login</Link>
    </div>

  </>

  // {/*</StyledWrapper>*/}
);

Home.getLayout = getLayout
export default Home;
