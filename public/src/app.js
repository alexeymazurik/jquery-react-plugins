var Table = React.createClass({
    loadCommentsFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState({multiplySort: [], data: data.slice(), copy: data.slice()});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    getInitialState: function(){
        return {multiplySort: [], data: [], copy: []}
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    changeMultiplyParams: function(param) {


        var tmp = this.state.multiplySort;
        var tmpData = this.state.data.slice();
        var tmpCopy = this.state.copy.slice();

        if (tmp.indexOf(param) == -1) {
            tmp.push(param);
        }
        else {
            tmp.splice(tmp.indexOf(param), 1);
        }

        tmpData = tmp.length ? tmpData.sort(sortingEngine.dynamicSortMultiple(tmp)) : tmpCopy;

        this.setState({multiplySort: tmp, data: tmpData, copy: tmpCopy});
    },

    render: function() {
        var list = this.state.data;
        var header = [];
        var self = this;
        var params = this.state.multiplySort;

        for (var key in list[0]) {
            header.push(key);
        }

        return (
            <table style={{border: "1px solid black"}}>
                <thead>
                    <tr>
                        {header.map(function(elem){
                            return (params.indexOf(elem) == -1) 
                                ? (<td style={{fontWeight: "bold", border: "1px solid black", cursor: "pointer", padding: "5px"}} onClick={self.changeMultiplyParams.bind(self, elem)}>{elem}</td>)
                                : (<td style={{fontWeight: "bold", border: "1px solid black", cursor: "pointer", background: "lightgreen", padding: "5px"}} onClick={self.changeMultiplyParams.bind(self, elem)}>{elem}</td>)
                         
                        })}
                    </tr>
                </thead>
                <tbody>
                    {list.map(function(element){
                        return (
                            <tr>
                                {header.map(function(el){
                                    return (
                                        <td style={{border: "1px solid black", padding: '5px'}}>
                                            {element[el]}
                                        </td>
                                        )
                                })}
                            </tr>
                            )
                    })}
                </tbody>
            </table>
            )
    }
});




// var data = [
//     {"First name": "Иван", "Middle name": "Иванович", "Last name": "Иванов", "Year": 1985, "Status": 1},
//     {"First name": "Иван", "Middle name": "Иванович", "Last name": "Петров", "Year": 1986, "Status": 0},
//     {"First name": "Иван", "Middle name": "Петрович", "Last name": "Николаев", "Year": 1985, "Status": 0},
//     {"First name": "Иван", "Middle name": "Николаевич", "Last name": "Иванов", "Year": 1982, "Status": 1},
//     {"First name": "Иван", "Middle name": "Иванович", "Last name": "Николаев", "Year": 1990, "Status": 1},
//     {"First name": "Петр", "Middle name": "Петрович", "Last name": "Валентинов", "Year": 1981, "Status": 1},
//     {"First name": "Петр", "Middle name": "Валентинович", "Last name": "Валентинов", "Year": 1985, "Status": 0},
//     {"First name": "Петр", "Middle name": "Николаевич", "Last name": "Петров", "Year": 1985, "Status": 0},
//     {"First name": "Петр", "Middle name": "Валентинович", "Last name": "Петров", "Year": 1985, "Status": 1},
//     {"First name": "Николай", "Middle name": "Николаевич", "Last name": "Николаев", "Year": 1986, "Status": 1},
//     {"First name": "Николай", "Middle name": "Николаевич", "Last name": "Валентинов", "Year": 1986, "Status": 1},
//     {"First name": "Николай", "Middle name": "Валентинович", "Last name": "Николаев", "Year": 1972, "Status": 0},
//     {"First name": "Валентин", "Middle name": "Николаевич", "Last name": "Валентинов", "Year": 1990, "Status": 0},
//     {"First name": "Валентин", "Middle name": "Иванович", "Last name": "Валентинов", "Year": 1972, "Status": 1}
// ];

React.render(
    <Table url="/getData" />,
    document.getElementById('content')
)