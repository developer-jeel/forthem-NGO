from django.urls import path
from . import views

app_name = "finance_manager"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("campaigns/", views.campaigns, name="campaigns"),
    path("donations/", views.donations, name="donations"),
    path("donors/", views.donors, name="donors"),
    path("donors/<int:donor_id>/", views.donor_profile, name="donor_profile"),
    path("fund-requests/", views.fund_requests, name="fund_requests"),
    path("fund-requests/<int:request_id>/", views.fund_request_detail, name="fund_request_detail"),
    path("fund-approvals/", views.fund_approvals, name="fund_approvals"),
    path("disbursements/", views.disbursements, name="disbursements"),
    path("expenses/", views.expenses, name="expenses"),
    path("expenses/new/", views.expense_new, name="expense_new"),
    path("expense-claims/", views.expense_claims, name="expense_claims"),
    path("expense-verification/", views.expense_verification, name="expense_verification"),
    path("receipts/", views.receipts, name="receipts"),
    path("receipts/preview/", views.receipt_preview, name="receipt_preview"),
    path("department-budgets/", views.department_budgets, name="department_budgets"),
    path("department-budgets/<int:budget_id>/", views.department_budget_detail, name="department_budget_detail"),
    path("cash-position/", views.cash_position, name="cash_position"),
    path("reports/", views.reports, name="reports"),
    path("audit-log/", views.audit_log, name="audit_log"),
    path("compliance/", views.compliance, name="compliance"),
    path("pan-audit/", views.pan_audit, name="pan_audit"),
]
