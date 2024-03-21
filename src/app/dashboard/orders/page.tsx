"use client";

import {
  Button,
  Card,
  Container,
  Strong,
  ScrollArea,
  Box,
  Heading,
  Flex,
  Text,
  Avatar,
} from "@radix-ui/themes";
import styles from "./products.module.css";
import { DataTable } from "@/app/components/table/components/data-table";
import { columns } from "@/app/components/table/components/columns";
import Image from "next/image";
import { UserNav } from "@/app/components/table/components/user-nav";

export default function Orders() {
  return (
    <Container>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          </div>
        </div>
        <DataTable data={[]} columns={columns} />
      </div>
    </Container>
    // <Container>
    //   <div className={styles.section}>
    //     <div className={styles.billingSection}>
    //       <Card>
    //         <div>
    //           <Strong>Billing</Strong> : 1500
    //         </div>
    //         <div>
    //           <Strong>Profit</Strong> : 1200
    //         </div>
    //       </Card>
    //     </div>
    //     <div>
    //       <Button>Request Payment</Button>
    //     </div>
    //     <div>
    //       <ScrollArea
    //         type="always"
    //         scrollbars="vertical"
    //         style={{ height: 250 }}
    //       >
    //         <Box p="2" pr="8">
    //           <Heading size="4" mb="2" trim="start">
    //             Order List
    //           </Heading>
    //           <Flex direction="column" gap="4">
    //             <Card>
    //               <Flex gap="3" align="center">
    //                 <Avatar
    //                   size="3"
    //                   src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
    //                   radius="full"
    //                   fallback="T"
    //                 />
    //                 <Box>
    //                   <Text as="div" size="2" weight="bold">
    //                     Teodros Girmay
    //                   </Text>
    //                   <Text as="div" size="2" color="gray">
    //                     Engineering
    //                   </Text>
    //                 </Box>
    //               </Flex>
    //             </Card>
    //             <Card>
    //               <Flex gap="3" align="center">
    //                 <Avatar
    //                   size="3"
    //                   src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
    //                   radius="full"
    //                   fallback="T"
    //                 />
    //                 <Box>
    //                   <Text as="div" size="2" weight="bold">
    //                     Teodros Girmay
    //                   </Text>
    //                   <Text as="div" size="2" color="gray">
    //                     Engineering
    //                   </Text>
    //                 </Box>
    //               </Flex>
    //             </Card>
    //           </Flex>
    //         </Box>
    //       </ScrollArea>
    //     </div>
    //   </div>
    // </Container>
  );
}
