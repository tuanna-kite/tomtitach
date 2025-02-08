"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Books } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { createOrder } from "@/app/(routes)/order/_action/order-action";

const CreateOrderSchema = z.object({
  fullname: z.string().trim().min(1, "Tên không được để trống"),
  address: z.string().trim().min(1, "Địa chỉ không được để trống"),
  phone: z.string().trim().min(1, "Số điện thoại không được để trống"),
  district: z.string().trim().min(1, "Quận/Huyện không được để trống"),
  city: z.string().trim().min(1, "Tỉnh/Thành phố không được để trống"),
  email: z.string().trim().optional(),
});

const OrderForm = ({ book, userId }: { book: Books; userId: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      district: "",
      city: "",
      address: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateOrderSchema>) => {
    try {
      const {
        success,
        error,
        data: order,
      } = await createOrder({
        userId,
        bookId: book.id,
        ...data,
      });

      if (!success) {
        toast.error(error);
        return;
      }

      router.push(`/order/checkout/${order?.id}`);
      toast.success("Order created successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-8 lg:gap-x-12 gap-y-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập tên người nhận" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập số điện thoại nhận đơn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quận/Huyện</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Quận/Huyện" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tỉnh/Thành phố</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tỉnh/Thành phố" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Địa chỉ người nhận" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email người nhận" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="hidden md:block"></div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-80 py-5 rounded-lg font-light"
            >
              Giao đến địa chỉ này
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;
