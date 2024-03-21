"use client";
import Image from "next/image";
import styles from "./globalLayout.module.css";
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Avatar,
  Strong,
} from "@radix-ui/themes";
import {
  PlusCircledIcon,
  HomeIcon,
  StackIcon,
  CubeIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Flex align="center" justify="center">
          <div className={styles.logo}>
            <Avatar size="2" src="/LogoBlack.png" fallback="R" />
          </div>
        </Flex>
        <div className={styles.sectionMenu}>
          <div className={styles.newProduct}>
            <Link href="/dashboard/product/new">
              <Button
                style={{
                  height: "35px",
                  display: "grid",
                  gap: "5px",
                  gridTemplateColumns: "16px 1fr",
                }}
              >
                <PlusCircledIcon width="16" height="16" />
                New Product
              </Button>
            </Link>
          </div>
          <div className={styles.list}>
            <Link href="/dashboard">
              <Button
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "16px 1fr",
                  width: "138px",
                  justifyItems: "start",
                }}
                variant="ghost"
              >
                <HomeIcon width="16" height="16" /> <span>Home</span>
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "16px 1fr",
                  width: "138px",
                  justifyItems: "start",
                }}
                variant="ghost"
              >
                <CubeIcon width="16" height="16" />
                <span>Products</span>
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "16px 1fr",
                  width: "138px",
                  justifyItems: "start",
                }}
                variant="ghost"
              >
                <StackIcon width="16" height="16" /> <span>Orders</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.buttomSection}>
          <Avatar size="4" radius="full" fallback="F" />
          <button>
            <ExitIcon />
          </button>
        </div>
      </div>
      <div className={styles.section}> {children}</div>
    </div>
  );
}
