angular.module('salaryApp', [])
    .controller('MainController', function ($scope) {
        $scope.items = [];

        $scope.addItem = function () {
            $scope.items.push({
                title: '',
                value: 0,
                operator: '+',
                operand: 0,
                result: 0
            });
        };

        $scope.removeItem = function (index) {
            $scope.items.splice(index, 1);
        };

        $scope.updateResult = function (item) {
            var val = parseFloat(item.value) || 0;
            var op = item.operator;
            var operand = parseFloat(item.operand) || 0;

            switch (op) {
                case '+': item.result = val + operand; break;
                case '-': item.result = val - operand; break;
                case '*': item.result = val * operand; break;
                case '/': item.result = operand !== 0 ? val / operand : 0; break;
                default: item.result = val;
            }
        };

        $scope.getTotal = function () {
            var total = $scope.items.reduce(function (sum, item) {
                return sum + (parseFloat(item.result) || 0);
            }, 0);
            return total.toLocaleString('vi-VN');
        };

        $scope.getTotalClass = function () {
            var total = $scope.items.reduce(function (sum, item) {
                return sum + (parseFloat(item.result) || 0);
            }, 0);

            if (total >= 15000000) return 'text-success font-weight-bold';
            if (total >= 10000000) return 'text-primary font-weight-bold';
            if (total >= 5000000) return 'text-warning font-weight-bold';
            return 'text-danger font-weight-bold';
        };

        $scope.getMessage = function () {
            var total = $scope.items.reduce(function (sum, item) {
                return sum + (parseFloat(item.result) || 0);
            }, 0);

            if (total >= 15000000) return '💰 Giàu vcl';
            if (total >= 10000000) return '👏 10 điểm luôn';
            if (total >= 5000000) return '😎 Cũng đỉnh rồi đó bạn';
            return '🥲 Bạn ơi cố lên nào';
        };


        $scope.parseValue = function (item) {
            let raw = item.displayValue?.toString().replace(/[^\d]/g, '');
            item.value = parseFloat(raw) || 0;
            $scope.updateResult(item);
        };

        $scope.formatValue = function (item) {
            item.displayValue = item.value.toLocaleString('vi-VN');
        };

        $scope.parseOperand = function (item) {
            let raw = item.displayOperand?.toString().replace(/[^\d]/g, '');
            item.operand = parseFloat(raw) || 0;
            $scope.updateResult(item);
        };

        $scope.formatOperand = function (item) {
            item.displayOperand = item.operand.toLocaleString('vi-VN');
        };

        $scope.closeAll = function() {
            $scope.items = [];
        }


    });
