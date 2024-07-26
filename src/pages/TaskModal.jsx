import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TaskModal = ({ isOpen, onClose, task, defaultDate }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [checklist, setChecklist] = useState(task?.checklist || []);
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : defaultDate || new Date());
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [customFields, setCustomFields] = useState(task?.customFields || []);

  const handleSave = () => {
    // Here you would typically save the task data
    console.log({ title, description, checklist, dueDate, priority, customFields });
    onClose();
  };

  const addChecklistItem = () => {
    setChecklist([...checklist, { id: Date.now(), text: '', checked: false }]);
  };

  const updateChecklistItem = (id, text, checked) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, text, checked } : item
    ));
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { id: Date.now(), name: '', type: 'text', value: '' }]);
  };

  const updateCustomField = (id, name, type, value) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, name, type, value } : field
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <div>
            <h4 className="mb-2 font-medium">Checklist</h4>
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(checked) => updateChecklistItem(item.id, item.text, checked)}
                />
                <Input
                  value={item.text}
                  onChange={(e) => updateChecklistItem(item.id, e.target.value, item.checked)}
                  placeholder="Checklist item"
                />
              </div>
            ))}
            <Button onClick={addChecklistItem} variant="outline" size="sm">Add Checklist Item</Button>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Due Date</h4>
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              className="rounded-md border"
            />
          </div>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <h4 className="mb-2 font-medium">Custom Fields</h4>
            {customFields.map((field) => (
              <div key={field.id} className="flex items-center space-x-2 mb-2">
                <Input
                  value={field.name}
                  onChange={(e) => updateCustomField(field.id, e.target.value, field.type, field.value)}
                  placeholder="Field Name"
                />
                <Select 
                  value={field.type} 
                  onValueChange={(value) => updateCustomField(field.id, field.name, value, field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Field Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={field.value}
                  onChange={(e) => updateCustomField(field.id, field.name, field.type, e.target.value)}
                  placeholder="Field Value"
                  type={field.type}
                />
              </div>
            ))}
            <Button onClick={addCustomField} variant="outline" size="sm">Add Custom Field</Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;