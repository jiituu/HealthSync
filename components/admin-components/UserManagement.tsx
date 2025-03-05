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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";

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
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
    <div className="mt-10 p-4 w-full">
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

      <div className="">
      <Table className="w-full">
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
                  <Button
                    variant="outline"
                    className="bg-secondaryColor text-white"
                    onClick={() =>
                      setSelectedUser({
                        ...user,
                        phone: "555-1234",
                        email: "user@example.com",
                        gender: user.role === "Doctor" ? "Male" : "Female",
                        age: user.role === "Doctor" ? 45 : 30,
                        specialization: user.role === "Doctor" ? "Cardiology" : undefined,
                        status: user.role === "Doctor" ? "Active" : undefined,
                        license: user.role === "Doctor" ? "/license.pdf" : undefined,
                        licenseVerified: user.role === "Doctor" ? true : undefined,
                        rating: user.role === "Doctor" ? 4 : undefined,
                      })
                    }
                  >
                    More
                  </Button>
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
        <Pagination className="">
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

      {selectedUser && (
        <Dialog open={true} onOpenChange={(open) => { if (!open) setSelectedUser(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser.role} Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><span className="font-bold">Full Name</span>: {selectedUser.name}</p>
              <p><span className="font-bold">Phone</span>: {selectedUser.phone}</p>
              <p><span className="font-bold">Email</span>: {selectedUser.email}</p>
              <p><span className="font-bold">Gender</span>: {selectedUser.gender}</p>
              <p><span className="font-bold">Age</span>: {selectedUser.age}</p>
              <p><span className="font-bold">Role</span>: {selectedUser.role}</p>
              <p><span className="font-bold">Joined</span>: {selectedUser.joined}</p>
              {selectedUser.role === "Doctor" && (
                <>
                  <p><span className="font-bold">Specialization</span>: {selectedUser.specialization}</p>
                  <p><span className="font-bold">Status</span>: {selectedUser.status}</p>
                  <p>
                  <span className="font-bold">License Document</span>
                    :{" "}
                    <Link href={selectedUser.license} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                      View
                    </Link>{" "}
                    ({selectedUser.licenseVerified ? "Verified" : "Not Verified"})
                  </p>
                  <p className="flex items-center">
                  <span className="font-bold">Rating</span>: {Array.from({ length: 5 }, (_, i) => i < selectedUser.rating ? <FaStar key={i} color="orange" /> : <FaRegStar key={i} color="orange" />)}
                  </p>
                </>
              )}
              {selectedUser.role === "Patient" && (
                <p><span className="font-bold">Address</span>: {selectedUser.address}</p>
              )}
            </div>
            <DialogFooter>
              {selectedUser.role === "Doctor" && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (selectedUser) {
                      const newStatus = selectedUser.status === "Active" ? "Banned" : "Active";
                      setSelectedUser({ ...selectedUser, status: newStatus });
                    }
                  }}
                >
                  {selectedUser.status === "Active" ? "Ban" : "Resume"}
                </Button>
              )}
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
