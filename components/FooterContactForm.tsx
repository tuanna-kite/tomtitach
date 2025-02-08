"use client";

import React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send2 } from "iconsax-react";
import { Textarea } from "@/components/ui/textarea";

const FooterContactFormSchema = z.object({
  fullname: z.string().min(1, "Tên không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  address: z.string().min(1, "Địa chỉ gửi không được để trống"),
  note: z.string(),
});

function FooterContactForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FooterContactFormSchema>>({
    resolver: zodResolver(FooterContactFormSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FooterContactFormSchema>) => {
    try {
      const { data: exchangeRequest } = await axios.post("/api/contact", data);
      console.log(exchangeRequest);
      router.refresh();
      toast.success("Product created successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div className="flex max-sm:flex-col-reverse md:space-x-6">
          <div className="flex-1 space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ tên</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nhập tên người gửi" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 space-y-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nhập số điện thoại" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nhập địa chỉ gửi" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Nhập ghi chú" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="rounded-xl px-8 w-full font-normal inter"
              size="lg"
              disabled={loading}
            >
              {loading ? "Đang gửi...." : "Gửi yêu cầu"}
              {!loading && <Send2 size={18} className="ml-2" />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default FooterContactForm;
