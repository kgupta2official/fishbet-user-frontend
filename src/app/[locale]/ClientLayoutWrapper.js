'use client';

import { usePathname } from 'next/navigation';
import { TooltipProvider } from '@/components/ui/tooltip';
import SocketProvider from './SocketProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SidebarSection from '../../components/SidebarSection';
import Header from '../../components/Header/components';
import NextTopLoader from 'nextjs-toploader';
import FloatElements from '@/components/FloatElements';
import Footer from '@/components/footer/components';
import NavMobile from '@/components/nav-mobile/components';
import ChatModule from './@chat/page';
import BlockedPage from '@/components/block-page';

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const blockedRoutes = ['/blocked'] || '';

    const isBlockedPage = blockedRoutes.includes(pathname);

    if (isBlockedPage) {
        return (
            <>
                <TooltipProvider><BlockedPage /></TooltipProvider>
            </>
        );
    }

    return (
        // <SocketProvider>
        //   <SidebarProvider>
        //     <SidebarSection />
        //     <div className="flex flex-col min-h-screen">
        //       <Header />
        //       <div className="h-[calc(100vh-121px)] md:h-[calc(100vh-63px)] w-full overflow-y-auto scrollbar-thin scrollable-Content-Home">
        //         <div className="w-full px-[4vw] py-4 bg-[hsl(var(--main-background))] ">
        //           <div className="max-w-[1200px] mx-auto">
        //             <NextTopLoader color="#fa114f" showSpinner={false} />
        //             {children}
        //           </div>
        //         </div>
        //         <FloatElements />
        //         <Footer />
        //       </div>
        //       <NavMobile />
        //     </div>
        //     <ChatModule />
        //   </SidebarProvider>
        // </SocketProvider>

        <SocketProvider>
            <SidebarProvider>
                <SidebarSection />
                <SidebarInset>
                    <Header />
                    <div className="h-[calc(100vh-121px)] md:h-[calc(100vh-63px)] w-full overflow-y-auto scrollbar-thin scrollable-Content-Home">
                        <div className="w-full px-[4vw] py-4 bg-[hsl(var(--main-background))] ">
                            <div className="max-w-[1200px] mx-auto">
                                <NextTopLoader color="#fa114f" showSpinner={false} />
                                {children}
                            </div>
                        </div>
                        <FloatElements />
                        <Footer />
                    </div>
                    <NavMobile />
                </SidebarInset>
                <ChatModule />
            </SidebarProvider>
        </SocketProvider>
    );
}
