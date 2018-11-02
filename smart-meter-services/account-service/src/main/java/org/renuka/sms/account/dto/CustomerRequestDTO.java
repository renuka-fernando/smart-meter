package org.renuka.sms.account.dto;

import org.renuka.sms.account.entity.Customer;

public class CustomerRequestDTO {
    private Long id;
    private String password;
    private String fname;
    private String lname;
    private String email;
    private String contactNo;
    private String address_line1;
    private String address_line2;
    private String city;

    public static Customer getCustomerEntity(CustomerRequestDTO customerRequestDTO){
        Customer customer = new Customer();
        customer.setId(customerRequestDTO.id);
        customer.setFname(customerRequestDTO.fname);
        customer.setLname(customerRequestDTO.lname);
        customer.setEmail(customerRequestDTO.email);
        customer.setContactNo(customerRequestDTO.contactNo);
        customer.setAddress_line1(customerRequestDTO.address_line1);
        customer.setAddress_line2(customerRequestDTO.address_line2);
        customer.setCity(customerRequestDTO.city);
        return customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
}
