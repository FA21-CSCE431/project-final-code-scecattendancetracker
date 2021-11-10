import React from 'react' 
import { DialogContent, Box, Typography, Modal, TextField, Button } from '@material-ui/core'

class EventCodeEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_id: 2, 
            //event_code: this.props.event_code,
            member_id: this.props.member_id,
            attendance_data: {},
            show: false,
            code: '',
            show_error: false,
            create_new: false,
            has_attended: false,
        }
    }

    componentDidMount = () => {
        this.render();
        this.validateAttendance();
    }
    
    handleClose = () => {
        this.setState({show: false})
    }

    // see if attendance exists
    validateAttendance = () => {
        const mid = encodeURIComponent(this.state.member_id);
        const eid = encodeURIComponent(this.state.event_id);
        fetch(`/api/v1/attendance?member_id=${mid}&event_id=${eid}`, {
            method: 'GET', 
            headers: { 'ACCEPT': 'application/json'}
        }).then(response => response.json()
        ).then(data => {
            console.log(data.length);
            console.log(data);
            console.log(this.state);
            if (data.length == 0) {
                this.setState({create_new: true});
            } else {
                if (!data.attended)
                    this.setState({has_attended: true})
                this.setState({attendance_data: data})
            }
        }
        ).catch((error) => {console.log(error);
        });
    }

    updateAttendance = () => {
        data = this.state.attendance_data;

        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`api/v1/attendance/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data), 
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if (response.ok) {
                return true;
            }
        }).catch(error => {console.log(error)});
    }

    postAttendance = () => {
        var item = {
            member_id: this.state.member_id,
            event_id: this.state.event_id,
            rsvp: false,
            attended: true
        }

        const token = document.querySelector('[name=csrf-token]').content; 
        fetch(`api/v1/attendance`, {
            method: 'POST', 
            body: JSON.stringify({attendance: item}), 
            headers: { 'ACCEPT': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token }
        }).then((response) => {
            if(response.ok) {
                this.setState({has_attended: true})
                console.log('Attendance Created');
                return true;
            }
        }).catch(error => {console.log(error)});
    }

    handleInputChange = (event) => {
        var entry = event.target.value;
        var code = 'poop';

        if (entry.length == 4) {
            if (entry == code) {
                if (this.state.create_new) {
                    this.postAttendance()
                } else {
                    this.updateAttendance()
                }
                // DO SNACKBAR ON ATTENDANCE SUCCESS
            } else {
                this.setState({show_error: true});
            }
        } else {
            this.setState({show_error: false})
        }

        this.setState({code: entry})
    }

    render = () => {
        const code = this.state.code;
        const boxStyle = {
            width: '300',
            maxWidth: '100%',
            bgcolor: 'background.paper',  
            boxShadow: 24, 
            p: 4
        }

        return (
            <>
            <div sx={boxStyle}>
                {!this.state.has_attended ? 
                <div style={{
                    flexDirection: 'column', 
                    alignContent: 'center'
                }}>
                    <Typography> Enter Attendance Code </Typography>
                    <div className='code-entry' style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        {this.state.show_error ? 
                        <TextField
                            inputProps={{
                                maxLength: 4, 
                                fontSize: 24,
                            }}
                            error
                            value={code}
                            helperText='Incorrect Code.'
                            onChange={this.handleInputChange}
                        />
                        :
                        <TextField
                            inputProps={{
                                maxLength: 4, 
                                fontSize: 24,
                            }}
                            value={code}
                            helperText={`${code.length}/${4}`}
                            onChange={this.handleInputChange}
                        />}
                    </div>
                </div>
                :
                <div style={{
                    flexDirection: 'column', 
                    alignContent: 'center'
                }}>
                    <Typography>Attendance already logged!</Typography>
                </div>
                }
            </div>
            </>
        );
    }
}

export default EventCodeEntry;