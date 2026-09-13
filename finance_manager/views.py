from django.shortcuts import render


def dashboard(request):
    return render(request, "finance-manager/dashboard.html")


def campaigns(request):
    return render(request, "finance-manager/campaigns.html")


def donations(request):
    return render(request, "finance-manager/donations.html")


def donors(request):
    return render(request, "finance-manager/donors.html")


def donor_profile(request, donor_id):
    return render(request, "finance-manager/donor-profile.html")


def fund_requests(request):
    return render(request, "finance-manager/fund-requests.html")


def fund_request_detail(request, request_id):
    return render(request, "finance-manager/fund-request-detail.html")


def fund_approvals(request):
    return render(request, "finance-manager/fund-approvals.html")


def disbursements(request):
    return render(request, "finance-manager/disbursements.html")


def expenses(request):
    return render(request, "finance-manager/expenses.html")


def expense_new(request):
    return render(request, "finance-manager/expense-new.html")


def expense_claims(request):
    return render(request, "finance-manager/expense-claims.html")


def expense_verification(request):
    return render(request, "finance-manager/expense-verification.html")


def receipts(request):
    return render(request, "finance-manager/receipts.html")


def receipt_preview(request):
    return render(request, "finance-manager/receipt-preview.html")


def department_budgets(request):
    return render(request, "finance-manager/department-budgets.html")


def department_budget_detail(request, budget_id):
    return render(request, "finance-manager/department-budget-detail.html")


def cash_position(request):
    return render(request, "finance-manager/cash-position.html")


def reports(request):
    return render(request, "finance-manager/reports.html")


def audit_log(request):
    return render(request, "finance-manager/audit-log.html")


def compliance(request):
    return render(request, "finance-manager/compliance.html")


def pan_audit(request):
    return render(request, "finance-manager/pan-audit.html")
