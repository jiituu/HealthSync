"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Dummy user data
const usersData = [
  { id: "00001", name: "Dr Biruk Girma", address: "089 Kutch Green Apt. 448", joined: "2019-09-04", role: "Doctor" },
  { id: "00002", name: "Abeba Desalegn", address: "123 Main St", joined: "2020-01-12", role: "Patient" },
  { id: "00003", name: "Dr John Doe", address: "456 Elm St", joined: "2021-03-23", role: "Doctor" },
  { id: "00004", name: "Jane Smith", address: "789 Oak St", joined: "2022-02-15", role: "Patient" },
  { id: "00005", name: "Dr Alice Johnson", address: "101 Pine St", joined: "2020-07-30", role: "Doctor" },
  { id: "00006", name: "Bob Brown", address: "202 Maple St", joined: "2021-11-08", role: "Patient" },
  { id: "00007", name: "Dr Charlie Black", address: "303 Cedar St", joined: "2024-05-19", role: "Doctor" },
  { id: "00008", name: "Eve White", address: "404 Birch St", joined: "2022-08-27", role: "Patient" },
];

// Function to filter users by joined
const filterByDate = (joined: string, filter: string) => {
  const userDate = new Date(joined);
  const today = new Date();

  switch (filter) {
    case "week":
      return userDate >= new Date(today.setDate(today.getDate() - 7));
    case "month":
      return userDate >= new Date(today.setMonth(today.getMonth() - 1));
    case "4months":
      return userDate >= new Date(today.setMonth(today.getMonth() - 4));
    case "year":
      return userDate >= new Date(today.setFullYear(today.getFullYear() - 1));
    default:
      return true;
  }
};

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const filteredUsers = usersData.filter(user =>
    (roleFilter !== "all" ? user.role === roleFilter : true) &&
    (search ? user.name.toLowerCase().includes(search.toLowerCase()) : true) &&
    filterByDate(user.joined, dateFilter)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-4 mb-4">
        <Select value={roleFilter} onValueChange={(value) => { setRoleFilter(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Doctor">Doctor</SelectItem>
            <SelectItem value="Patient">Patient</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={(value) => { setDateFilter(value); setCurrentPage(1); }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="4months">Last 4 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Input 
          placeholder="Search by name..." 
          value={search} 
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
          className="w-[250px]" 
        />
      </div>

      <div className="relative h-[500px]">
      <Table className="w-full bg-[#eeffff]">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outline" className="bg-secondaryColor text-white">More</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="mt-4 absolute bottom-0">
          <PaginationContent>
            <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
          </PaginationContent>
        </Pagination>
      )}
      </div>
    </div>
  );
};

export default UserManagement;
