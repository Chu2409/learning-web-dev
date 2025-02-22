package dev.jeep.Lookpay.models;

import java.util.List;

import dev.jeep.Lookpay.enums.BankAccountTypeEnum;
import dev.jeep.Lookpay.enums.BankCoopEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "bank_coop_accounts")
@AllArgsConstructor
@RequiredArgsConstructor

public class BankCoopAccountModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BankAccountTypeEnum accountType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BankCoopEnum bankName;

    @Column(nullable = false)
    private String bankCode;

    @Column(nullable = false)
    private String accountHolderName;

    @Column(nullable = false)
    private String accountHolderDNI;

    @Column(nullable = false)
    private String accountHolderEmail;

    @Column(nullable = false)
    private double balance;

    @ManyToMany(mappedBy = "bankAccounts")
    private List<ClientModel> clients;
}
