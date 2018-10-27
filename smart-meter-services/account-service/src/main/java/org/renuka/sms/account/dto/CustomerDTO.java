package org.renuka.sms.account.dto;

import org.renuka.sms.account.entity.Account;
import org.renuka.sms.account.entity.Customer;

import java.util.Set;

public class CustomerDTO {
    private Long id;
    private String password;
    private String fname;
    private String lname;
    private String email;
    private String contactNo;
    private String address_line1;
    private String address_line2;
    private String city;
    private Set<Account> accounts;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getAddress_line1() {
        return address_line1;
    }

    public void setAddress_line1(String address_line1) {
        this.address_line1 = address_line1;
    }

    public String getAddress_line2() {
        return address_line2;
    }

    public void setAddress_line2(String address_line2) {
        this.address_line2 = address_line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<Account> accounts) {
        this.accounts = accounts;
    }

    public static CustomerDTO build(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(customer.getId());
        customerDTO.setFname(customer.getFname());
        customerDTO.setLname(customer.getLname());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setContactNo(customer.getContactNo());
        customerDTO.setAddress_line1(customer.getAddress_line1());
        customerDTO.setAddress_line2(customer.getAddress_line2());
        customerDTO.setCity(customer.getCity());
        customerDTO.setAccounts(customer.getAccounts());
        return customerDTO;
    }
}
