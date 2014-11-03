(function($){

    $.fn.sorting = function() {


        var thead = [],
            tbody = [],
            $self = $(this),
            multiplySort = [];



        $self.find('thead tr td').each(function(){
            thead.push($(this).text());
            $(this).css({
                "cursor": "pointer"
            })
        });



        $self.find('tbody tr').each(function(){
            var tmp = {};
            $(this).find('td').each(function(i){
                tmp[thead[i]] = $(this).text();
            });
            tbody.push(tmp);
        });

        $self.find('thead tr td').each(function(){
            $(this).on('click', function(){
                var tmp = $(this).text();
                if (multiplySort.indexOf(tmp) == -1) {
                    multiplySort.push(tmp);
                    $(this).css("background", "lightgreen");
                }
                else {
                    multiplySort.splice(multiplySort.indexOf(tmp),1);
                    $(this).css("background", "none");
                }
                sort();
            });
        });


        function sort() {
            var smth = multiplySort.length ? tbody.slice().sort(sortingEngine.dynamicSortMultiple(multiplySort)) : tbody.slice(),
                tbodyCells = [];

            $self.find('tbody tr').each(function(){
                var tmp = [];
                $(this).find('td').each(function(){
                    tmp.push($(this));
                });
                tbodyCells.push(tmp);
            });

            for (var i = 0; i < tbodyCells.length; i++) {
                for (var j = 0; j < tbodyCells[i].length; j++) {
                    tbodyCells[i][j].text(smth[i][thead[j]]);
                }
            }
        }

    }
}($));